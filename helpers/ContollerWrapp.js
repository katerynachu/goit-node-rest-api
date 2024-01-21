const controllerWrapp = (controller) => {
const controllerFn = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return controllerFn;
}; 
module.exports = controllerWrapp ;