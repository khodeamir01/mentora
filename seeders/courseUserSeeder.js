// seeders/courseUserSeeder.js
const CourseUser = require("../models/Course-User");
const User = require("../models/User");
const Course = require("../models/Course");

const seedCourseUsers = async () => {
    try {
        await CourseUser.deleteMany({});
        console.log("Old course enrollments cleared");

        const users = await User.find({ roles: "USER" });
        
        const courses = await Course.find({ status: "published" });

        if (users.length === 0 || courses.length === 0) {
            console.log(" No users or courses found");
            return;
        }

        const enrollments = [
            { user: users[0]._id, course: courses[0]._id, price: courses[0].price }, 
            { user: users[0]._id, course: courses[1]._id, price: courses[1].price }, 
            { user: users[0]._id, course: courses[2]._id, price: courses[2].price }, 
            
            { user: users[1]._id, course: courses[2]._id, price: courses[2].price },
            { user: users[1]._id, course: courses[3]._id, price: courses[3].price }, 
            
            { user: users[2]._id, course: courses[0]._id, price: courses[0].price }, 
            
            { user: users[0]._id, course: courses[3]._id, price: courses[3].price }, 
            { user: users[1]._id, course: courses[1]._id, price: courses[1].price }, 
        ];

        const uniqueEnrollments = [];
        for (const enrollment of enrollments) {
            const exists = uniqueEnrollments.find(
                e => e.user.toString() === enrollment.user.toString() && 
                     e.course.toString() === enrollment.course.toString()
            );
            if (!exists) {
                uniqueEnrollments.push(enrollment);
            }
        }

        const created = await CourseUser.insertMany(uniqueEnrollments);
        console.log(` ${created.length} course enrollments created`);
        
        for (const enrollment of created) {
            const user = users.find(u => u._id.toString() === enrollment.user.toString());
            const course = courses.find(c => c._id.toString() === enrollment.course.toString());
            console.log(`  ${user?.name} ثبت‌نام کرد در ${course?.name} - ${enrollment.price.toLocaleString()} تومان`);
        }

    } catch (error) {
        console.error(" Error:", error.message);
    }
};

module.exports = seedCourseUsers;