export const mockAxios = {
    get: jest.fn().mockImplementation(() => {
        return Promise.resolve("Hello")
    })
}