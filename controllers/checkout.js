const { createPayment, verifyPayment } = require("./../services/zarinpal");
const {successResponse, errorResponse} = require("./../helpers/responses")
const Cart = require("./../models/Cart");
const Checkout = require("./../models/Checkout");
const Order = require("./../models/Order");
const Course = require("./../models/Course"); 
const CourseUser = require("./../models/Course-User"); 

exports.createCheckout = async (req, res, next) => {
    try {
        const user = req.user;


        // populate با فیلدهای مدل خودت
        const cart = await Cart.findOne({ user: user._id })
            .populate("items.course")   // به جای items.Course
            .populate("items.teacher");  // به جای items.seller

        if (!cart?.items?.length) {
            return errorResponse(res, 400, "سبد خرید خالی است!");
        }

        const checkoutItems = [];

        for (const item of cart.items) {
            const { course, teacher, quantity, priceAtTime } = item;

            if (course.teacher.toString() !== teacher._id.toString()) {
                return errorResponse(res, 400, "مدرس این دوره را تدریس نمی‌کند!");
            }

            checkoutItems.push({
                course: course._id,      // به جای Course
                teacher: teacher._id,     // به جای seller
                quantity: quantity,
                priceAtTimeOfPurchase: priceAtTime   // به جای priceAtTime
            });
        }

        const newCheckout = new Checkout({
            user: user._id,
            items: checkoutItems,
            authority: "pending"  // موقتاً یه مقدار بذار

        });

        // محاسبه قیمت کل
        const totalPrice = checkoutItems.reduce((total, item) => {
            return total + item.priceAtTimeOfPurchase * 10       // *10  : Change Tooman to Rial
        }, 0);

        const payment = await createPayment({
            amountInRial: totalPrice,  
            description: `سفارش با شناسه ${newCheckout._id}`,
            mobile: user.phone || "09120000000"  
        });

        newCheckout.authority = payment.authority;
        await newCheckout.save();

        return successResponse(res, 201, {
            message: "Checkout created successfully",
            checkout: newCheckout,
            paymentUrl: payment.paymentUrl
        });

    } catch (err) {
        next(err);
    }
};

exports.verifyCheckout = async (req, res, next) => {
    try {
        const { Authority: authority } = req.query;

        const alreadyCreatedOrder = await Order.findOne({ authority });
        if (alreadyCreatedOrder) {
            return res.render("shopping/payment-result", {
                success: false,
                message: "این پرداخت قبلاً تأیید شده است!",
                orderId: alreadyCreatedOrder._id
            });
        }

        const checkout = await Checkout.findOne({ authority });
        if (!checkout) {
            return res.render("shopping/payment-result", {
                success: false,
                message: "Checkout یافت نشد",
                orderId: null
            });
        }

        const totalPrice = checkout.items.reduce((total, item) => {
            return total + item.priceAtTimeOfPurchase * 10;
        }, 0);

        const payment = await verifyPayment({ 
            authority, 
            amountInRial: totalPrice 
        });
        console.log("payment --->",payment);

        if (![100, 101].includes(payment.code)) {
            return res.render("shopping/payment-result", {
                success: false,
                message: "پرداخت تأیید نشد!",
                orderId: null
            });
        }

        const order = new Order({
            user: checkout.user,
            authority: checkout.authority,
            items: checkout.items,
        });

        await order.save();

        for (const item of checkout.items) {
            const course = await Course.findById(item.course);

            if (course) {
                const existStudent = await CourseUser.findOne({
                    user: checkout.user,
                    course: course._id
                });
                
                if (!existStudent) {
                    await CourseUser.create({
                        user: checkout.user,
                        course: course._id,
                        price: item.priceAtTimeOfPurchase
                    });
                }
                await course.save();
            }
        }

        await Cart.findOneAndUpdate(
            { user: checkout.user }, 
            { items: [] }
        );

        await Checkout.deleteOne({ _id: checkout._id });

        return res.render("shopping/payment-result", {
            success: true,
            message: "پرداخت با موفقیت انجام شد ✅",
            orderId: order._id,
            order: order,
            ref_id: payment.ref_id || null
        });

    } catch (err) {
        console.error("Verify error:", err);
        return res.render("shopping/payment-result", {
            success: false,
            message: "خطا در تأیید پرداخت",
            orderId: null
        });
    }
};