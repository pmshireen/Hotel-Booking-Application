/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import ListOfReviewsContainer from "./ListOfReviewsContainer";

function FullReview() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState("");
  const [ratingMessage, setRatingMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // Calculate the average guestRating from the fetched reviews data
  const calculateAverageRating = useCallback(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + parseFloat(review.guestRating),
      0
    );
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  // Function to get the rating message based on averageRating
  const getRatingMessage = useCallback((rating) => {
    if (rating >= 1 && rating < 2) return "Very Bad";
    if (rating >= 2 && rating < 3) return "Bad";
    if (rating >= 3 && rating < 4) return "Satisfactory";
    if (rating >= 4 && rating < 5) return "Very Good";
    if (rating === 5) return "Amazing";
    return "N/A";
  }, []);

  // fetching of review data
  const params = new URLSearchParams(window.location.search);
      const hotelId = params.get('q'); 
  const fetchReviewsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3200/hotels/${hotelId}/guest-reviews`
      );
      if (!response.ok) {
        setErrorMessage("Failed to fetch reviews data");
        setSnackbarOpen(true);
        throw new Error("Failed to fetch reviews data");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      setErrorMessage(error);
      setSnackbarOpen(true);
      console.error("Error occurred while fetching reviews data:", error);
    }
  };
  // Function to handle adding new review
  const handleReviewSubmit = async (newReview) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3200/hotels/${hotelId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
          credentials: "include",
        }
      );
      const addedReview = await response.json();
      if (!response.ok) {
        handleReviewSubmitError(addedReview.message);
        return;
      }
      // Handle review submission success
      handleReviewSubmitSuccess(addedReview);
    } catch (error) {
      // Handle review submission error
      handleReviewSubmitError(
        error.message || "Failed to add review. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, [reviews]);

  // Function to handle review submission success
  const handleReviewSubmitSuccess = (addedReview) => {
    setReviews((prevReviews) => [...prevReviews, addedReview]);
  };

  // Function to handle review submission failure
  const handleReviewSubmitError = (message) => {
    setErrorMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    setAverageRating(calculateAverageRating());
    const updatedRatingMessage = getRatingMessage(calculateAverageRating());
    setRatingMessage(updatedRatingMessage);
  }, [reviews, calculateAverageRating, getRatingMessage]);

  return (
    <>
      <Container
        variant="outlined"
        style={{
          width: '100%',
          maxHeight: '100%',
          margin: "0 auto",
          paddingLeft: "0px",
          paddingRight:'0px'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Reviews
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h2"
              component="span"
              style={{ fontWeight: "bold" }}
            >
              {averageRating}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              style={{ marginLeft: "4px", fontWeight: "bold" }}
            >
              {ratingMessage}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <Typography variant="h6" component="span">
              {reviews.length} verified reviews
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            width: "100%",
            maxWidth: 1232,
            height: "0.5px",
            backgroundColor: "#112211",
            opacity: 0.25,
            my: "8px",
          }}
        />
        <ListOfReviewsContainer
          reviews={reviews}
          onReviewSubmit={handleReviewSubmit}
          loading={loading}
        />
        <Box sx={{maxWidth:1232, height:90}}></Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FullReview;
