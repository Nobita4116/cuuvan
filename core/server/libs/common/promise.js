export function promise(target, key, descriptor) {
    return {
        ...descriptor,
        value() {
            let _args = arguments;
            let self = this;
    
            return new Promise(async (resolve, reject) => {
            let result;
            try {
                result = await descriptor.value.apply(self, _args);
            } catch (e) {
                return reject(e);
            }
            resolve(result);
            }); 
        }
    };
};