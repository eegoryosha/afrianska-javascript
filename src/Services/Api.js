export default class Api {
    static request(url, type, headers = null, data = null) {
        return new Promise(resolve => {
            const objectData = data ? { body: JSON.stringify(data) } : {}
            const startTime = new Date().getTime();

            fetch(url, {
                method: type.toUpperCase(),
                headers: {
                    'Content-type': 'application/json',
                    ...headers
                },
                ...objectData
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    const error = new Error(res?.statusText ?? 'Неизвестная ошибка');
                    error.response = response;
                    throw error;
                }
            })
            .then(data => resolve({
                success: true,
                data: data,
                time: (new Date().getTime() - startTime) / 1000
            }))
            .catch((error) => resolve({
                success: false,
                error: {
                    message: error?.message ?? 'Неизвестная ошибка',
                    status: error.response?.status ?? 520
                },
                time: (new Date().getTime() - startTime) / 1000
            }));
        })
    }
}
