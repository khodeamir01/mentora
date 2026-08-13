
exports.errorHandler = (err, req, res, next) => {

  if (err?.errors?.authority) {
    console.log({
      success: false,
      error: "ZarinPal Error, Sandbox server busy and doesnt send authority , Please try later",
      data: err,
    });
    return errorResponse(res, 500, "ZarinPal Error: Server busy, Please try later !");
  }










  if (err.inner === "ValidationError") {
    const errors = [];

    err.inner.forEach((e) => {
      errors.push({
        field: e.path,
        message: e.message,
      });
    });

    console.log({ success: false, error: "ValidationError", data: errors });

  }

  let message = err || "Internal Server Error !!";
  let status = err.status || 500;




};
