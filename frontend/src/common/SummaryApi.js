export const baseUrl = import.meta.env.VITE_API_URL

const SummaryApi = {
    register:{
        url:'/api/user/register',
        method:'post',
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : "get"
    },
    logout:{
        url:'/api/user/logout',
        method:'get'
    },
    uploadImage:{
        url:'/api/file/upload',
        method:'post'
    }, uploadAvatar : {
        url : "/api/user/upload-avatar",
        method : 'put'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    addCategory:{
        url:'/api/category/add-category',
        method:'post'
    },
    getCategory:{
        url:'/api/category/get-category',
        method:'get'
    },
    updateCategory:{
        url:'/api/category/update-category',
        method:'put'
    },
    deleteCategory:{
        url:'/api/category/delete-category',
        method:'delete'
    },
    createSubCategory:{
        url:'/api/subcategory/create-subCategory',
        method:'post'
    },
    getSubCategory:{
        url:'/api/subcategory/get-subCategory',
        method:'post'
    },
    updateSubCategory:{
        url:'/api/subcategory/update-subCategory',
        method:'put'
    },
    deleteSubCategory:{
        url:'/api/subcategory/delete-subCategory',
        method:'delete'
    },
    createProduct:{
        url:'/api/product/create',
        method:'post'
    },
    getProduct:{
        url:'/api/product/get-product',
        method:"post"

    },
    getProductByCategory : {
        url : '/api/product/get-product-by-category',
        method : 'post'
    },
    getProductByCategoryAndSubCategory : {
        url : '/api/product/get-product-by-category-and-subcategory',
        method : 'post'
    },
    getProductDetails : {
        url : '/api/product/get-product-details',
        method : 'post'
    },
    updateProductDetails : {
        url : "/api/product/update-product-details",
        method : 'put'
    },
    deleteProduct : {
        url : "/api/product/delete-product",
        method : 'delete'
    },
    searchProduct : {
        url : '/api/product/search-product',
        method : 'post'
    },
    addTocart : {
        url : "/api/cart/create",
        method : 'post'
    },
    getCartItem : {
        url : '/api/cart/getcartitems',
        method : 'get'
    },
    updateCartItemQty : {
        url : '/api/cart/updatecartitemqty',
        method : 'put'
    },
    deleteCartItem : {
        url : '/api/cart/deletecartitemqty',
        method : 'delete'
    },
    createAddress : {
        url : '/api/address/create',
        method : 'post'
    },
    getAddress : {
        url : '/api/address/get',
        method : 'get'
    },
    updateAddress : {
        url : '/api/address/update',
        method : 'put'
    },
    disableAddress : {
        url : '/api/address/disable',
        method : 'delete'
    },
    payment_url:{
        url:"/api/order/payment/create",
        method:"post"
    },
    payment_verify:{
        url:"/api/order/payment/verify",
        method:'post'
    },
    cashOnDeliveryOrder:{
        url : "/api/order/cash-on-delivery",
        method : 'post'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'get'
    },
    getAllOrder:{
        url:'/api/order/getAllOrder',
        method:'get'
    }

}

export default SummaryApi;