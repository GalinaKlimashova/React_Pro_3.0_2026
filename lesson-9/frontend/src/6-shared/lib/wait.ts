export const wait = (ms: number) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve(1);
            }

            reject();
        }, ms);
    });
