import axios from 'axios'

const initialState = {
  products: [],
  selectedProduct: {},
  avgReviews: []
}

const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECT_PRODUCT = 'SELECTED_PRODUCT'
const ADDED_REVIEW = 'ADDED_REVIEW'

const getProductsAction = (products, avgReviews) => ({
  type: GET_PRODUCTS,
  products,
  avgReviews
})

const setProductAction = product => ({
  type: SELECT_PRODUCT,
  product
})

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products')
    const products = res.data

    const resRev = await axios.get('/api/products/avgReviews')
    const avgReviews = resRev.data

    dispatch(getProductsAction(products, avgReviews))
  } catch (error) { console.log(error) }
}

export const setProduct = (product) => (dispatch) => {
  dispatch(setProductAction(product))
}

const addedReview = (review) => {
  return ({
    type: ADDED_REVIEW,
    review
  })
}

export const addReview = (review, selectedProduct) => {
  return async (dispatch) => {
    const response = await axios.post('api/reviews/', {review, selectedProduct} )
    dispatch(addedReview(response.data))
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_PRODUCTS:
    return {...state, products: action.products, avgReviews: action.avgReviews}
  case SELECT_PRODUCT:
    return {...state, selectedProduct: action.product}
  case ADDED_REVIEW:
    return {...state, selectedProduct: {...state.selectedProduct, reviews: [...state.selectedProduct.reviews, action.review]}}
  default:
    return state
  }
}
