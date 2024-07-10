import React,{useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { useLocalStorage } from "react-use"; // Import the hook


const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expirationDate: Yup.string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)")
    .test(
      "futureDate",
      "Expired card",
      function (value) {
        if (!value) return false;
        const today = new Date();
        const currentYear = today.getFullYear() % 100;
        const currentMonth = today.getMonth() + 1;
        const [expMonth, expYear] = value.split("/").map(Number);
        // Check if the expiration year is greater than or equal to the current year
        if (expYear < currentYear) {
          return false;
        } else if (expYear === currentYear) {
          // Check if the expiration month is greater than or equal to the current month
          return expMonth >= currentMonth;
        } else {
          return true;
        }
      }
    ),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "Invalid CVV"),
  cardHolder: Yup.string()
    .required("Name on card is required")
    .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed")
});
const PopupForm = ({ open, handleClosePopup, handleCardSelection }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveCardInfo, setSaveCardInfo] = useLocalStorage(
    "saveCardInfo",
    false
  );
  
  
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3200/auth/users/user/cards/saveCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: values.cardNumber,
          expirationDate: values.expirationDate,
          cvv: values.cvv,
          cardHolder: values.cardHolder,
        }),
      });
  
      if (response.ok) {
        // Handle the response from the backend (if needed)
        // Close the popup after successful submission
        handleClosePopup();
      } else {
        // Handle errors if the request fails
        const errorData = await response.json();
        console.error("Error adding card:", errorData);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
    setIsSubmitting(false);
  };
  ;
  
  return (
    <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="sm">
      <DialogContent>
        <Typography
          variant="n1"
        >
          <strong>Add New Card</strong>
        </Typography>
        <Formik
          initialValues={{
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            cardHolder: "",
            saveCardInfo: false
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            // Your form submission logic here
            handleClosePopup();
            handleCardSelection(values.cardNumber, values.expirationDate);
            
              setSubmitting(false); // Set isSubmitting to false after form submission
              handleClosePopup();
          
          }}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <Field
                as={TextField}
                name="cardNumber"
                label="Card Number"
                fullWidth
                sx={{ mb: 2, mt: 3 }}
                error={touched.cardNumber && Boolean(errors.cardNumber)}
                helperText={touched.cardNumber && errors.cardNumber}
              />
              <Field
                as={TextField}
                name="expirationDate"
                label="Expiry Date (MM/YY)"
                fullWidth
                sx={{ width: "250px", mb: 2 }}
                error={touched.expirationDate && Boolean(errors.expirationDate)}
                helperText={touched.expirationDate && errors.expirationDate}
              />
              <Field
                as={TextField}
                name="cvv"
                label="CVV"
                fullWidth
                sx={{ width: "250px", mb: 2, ml: 6 }}
                error={touched.cvv && Boolean(errors.cvv)}
                helperText={touched.cvv && errors.cvv}
                type="password"
              />
              <Field
                as={TextField}
                name="cardHolder"
                label="Card Holder"
                fullWidth
                sx={{ mb: 2 }}
                error={touched.cardHolder && Boolean(errors.cardHolder)}
                helperText={touched.cardHolder && errors.cardHolder}
              />
              <FormControlLabel
                value="secure"
                control={<Checkbox key="secureCheckbox" 
                checked={saveCardInfo}
                    onChange={(e) => setSaveCardInfo(e.target.checked)}
                  />}
                label="Securely save my information for 1-click checkout" 
                labelPlacement="end"
              />
              <Button
                variant="contained"
                style={{ bgcolor: "#8dd3bb", marginTop: "15px", marginBottom:"25px" }}
                fullWidth
                type="submit"
                disabled={!isValid}
                onClick={handleSubmit}
              >
                Add Card
              </Button>
              <Typography variant='d' lineHeight='1'> 
                By confirming your subscription, you allow The Outdoor Inn Crowd
                Limited to charge your card for this payment and future payments
                in accordance with their terms. You can always cancel your
                subscription.
              </Typography>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default PopupForm;