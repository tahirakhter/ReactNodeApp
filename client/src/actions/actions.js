export const changePage = (page,action) => {
    return {
        type: action,
        pageNumber:page
    }
}