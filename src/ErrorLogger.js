export const logError = (error) => {
    if (!(error instanceof Error)) return;
    console.log('error log');
    console.log(error.name);
    console.log(error.message);
}