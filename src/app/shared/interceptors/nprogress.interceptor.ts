import NProgress, { NProgressOptions } from 'nprogress';
import axios, { AxiosResponse, AxiosError } from 'axios';

const calculatePercentage = (loaded: number, total: number) => (Math.floor(loaded * 1.0) / total)

export function setupProgressBar(config: (null | NProgressOptions) = null, instance = axios) {
    let requestsCounter = 0;

    const setupStartProgress = () => {
        instance.interceptors.request.use(config => {
            requestsCounter++;
            NProgress.start();
            return config;
        });
    };

    const setupUpdateProgress = () => {
        const update = (e: any) => NProgress.inc(calculatePercentage(e.loaded, e.total));
        instance.defaults.onDownloadProgress = update;
        instance.defaults.onUploadProgress = update;
    };

    const setupStopProgress = () => {
        const responseFunc = (response: AxiosResponse) => {
            if ((--requestsCounter) === 0) {
                NProgress.done();
            }
            return response;
        };

        const errorFunc = (error: AxiosError) => {
            if ((--requestsCounter) === 0) {
                NProgress.done()
            }
            return Promise.reject(error);
        };

        instance.interceptors.response.use(responseFunc, errorFunc);
    }

    NProgress.configure(config as NProgressOptions);
    setupStartProgress();
    setupUpdateProgress();
    setupStopProgress();
}