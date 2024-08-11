import axios from '../../src/config/axios'; // Adjust the path as necessary

export const CREATE_REVIEW_REQUEST = 'CREATE_REVIEW_REQUEST';
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS';
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';

// Action Creators for creating a review
export const createReviewRequest = () => ({
  type: CREATE_REVIEW_REQUEST,
});

export const createReviewSuccess = (review) => ({
  type: CREATE_REVIEW_SUCCESS,
  payload: review,
});

export const createReviewFailure = (error) => ({
  type: CREATE_REVIEW_FAILURE,
  payload: error,
});

// Action Creators for fetching reviews
export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

export const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: reviews,
});

export const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: error,
});

// Thunk Action Creator for creating a review
export const createReview = (bookingId, reviewData) => {
  return (dispatch) => {
    dispatch(createReviewRequest());
    axios.post(`/review/${bookingId}`, reviewData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${localStorage.getItem('token')}`, // Ensure token is retrieved correctly
      },
    })
    .then((response) => {
      const review = response.data;
      dispatch(createReviewSuccess(review));
    })
    .catch((error) => {
      const errorMsg = error.message;
      dispatch(createReviewFailure(errorMsg));
      console.error(error);
    });
  };
};