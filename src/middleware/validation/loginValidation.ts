import Validator from 'validatorjs';

const validator = async (body: any, rules: Validator.Rules, customMessages: Validator.ErrorMessages | undefined, callback: { (err: any, status: any): void; (arg0: Validator.Errors | null, arg1: boolean): any; }) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

 const registerValidation = async (req:any, res:any, next:any) => {
    const validateRule = {
        "email": "required|email", 
        "password":"required|min:6",
        "type":"required"
    }

    await validator(req.body, validateRule, {}, (err: any, status: any) =>{
        if (!status){
            res.status(412)
            .send({
                success: false,
                    message: 'Validation failed',
                    data: err
            })
        
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

export default registerValidation