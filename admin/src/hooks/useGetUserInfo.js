export const useGetUserInfo = () => {
    const imageUrl = window.localStorage.getItem("imageUrl");
    const userName = window.localStorage.getItem("userName");
    return {
        "imageUrl": imageUrl,
        "userName": userName
    }
}