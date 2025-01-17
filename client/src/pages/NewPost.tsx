import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import NewPostModal from "../components/NewPostModal";
import { useState } from "react";
import { Link } from "react-router";

function NewPost() {
  const [show, setShow] = useState(false);

  // Function to show the modal
  const handleShow = () => {
    console.log("triggered :>> ");
    setShow(true);
  };
  // Function to hide the modal
  const handleClose = () => setShow(false);

  const listing = {
    delivery: "",
    description: "",
    images: null,
    light: "",
    location: "",
    price: 0,
    soil: "",
    species: "",
    water: "",
    deal: "",
    swapfor: "",
    condition: "",
    terms: false,
  };

  // handle submit
  const hundleSubmit = async (values: typeof listing) => {
    console.log("handleSubmit called");
    console.log("Form Values before submission:", values);

    const formdata = new FormData();
    formdata.append("delivery", values.delivery);
    formdata.append("description", values.description);
    formdata.append("images", values.images!);
    formdata.append("light", values.light);
    formdata.append("location", values.location);
    formdata.append("price", values.price.toString());
    formdata.append("soil", values.soil);
    formdata.append("species", values.species);
    formdata.append("water", values.water);
    formdata.append("deal", values.deal);
    formdata.append("swapfor", values.swapfor);
    formdata.append("condition", values.condition);

    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/listings/uploadListing",
        requestOptions
      );
      console.log("response :>> ", response);
      if (!response.ok) {
        throw new Error("something went wrong in the resoponse");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
        console.log('"This is just before handleShow"');
        handleShow();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // Formik schema
  const { Formik } = formik;
  const errorMessage = "This Field is required";
  const schema = yup.object().shape({
    delivery: yup.string().required(errorMessage),
    description: yup.string().required(errorMessage),
    location: yup.string().required(errorMessage),
    soil: yup.string().required(errorMessage),
    species: yup.string().required(errorMessage),
    water: yup.string().required(errorMessage),
    deal: yup.string().required(errorMessage),
    condition: yup.string().required(errorMessage),
    light: yup.string().required(errorMessage),
    price: yup
      .number()
      .typeError("Price must be a number")
      .test("price-required", "Price is required for sale", function (value) {
        const { deal } = this.parent; // Access the parent object, which contains 'deal'
        if (deal === "sale") {
          if (value === undefined || value === null) {
            return false; // If deal is 'sale', price is required
          }
          if (value < 1) {
            return this.createError({ message: "Price cannot be negative" }); // Check if the price is less than 1
          }
        }
        return true; // Otherwise, price is not required for non-sale deals
      }),

    swapfor: yup
      .string()
      .test(
        "swapfor-required",
        "Swap for is required for swap",
        function (value) {
          const { deal } = this.parent; // Access the parent object, which contains 'deal'
          if (deal === "swap") {
            if (value === undefined || value === null || value === "") {
              return false; // If deal is 'swap', swapfor is required
            }
          }
          return true; // Otherwise, swapfor is not required
        }
      ),
    images: yup
      .mixed<File>()
      .required("Please add at least 1 picture")
      .test(
        "fileType",
        "Unsupported file format. Only PNG, JPEG, JPG, and WEBP are allowed.",
        (value) => {
          return (
            // value &&
            value instanceof File &&
            ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
              value.type
            )
          );
        }
      ),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center poppins-regular form-container">
      <Link to="/listings">
        <Button className="go-back-button">
          {" "}
          <span className="material-symbols-outlined white">undo</span>
        </Button>
      </Link>
      <Col xs={12} md={8} lg={6} xl={8} className="mx-auto">
        <div>
          <h2 className="text-center mb-4 new-listing-title">New Plant</h2>
          {/* Start the form */}
          <Formik
            validationSchema={schema}
            onSubmit={hundleSubmit}
            initialValues={listing}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3 new-form"
              >
                {/* Plant Species */}

                <Form.Group controlId="validationFormik01">
                  {/*       <Form.Label>Plant Species</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Plant Species"
                    name="species"
                    value={values.species}
                    onChange={handleChange}
                    isValid={touched.species && !errors.species}
                    isInvalid={touched.species && !!errors.species}
                  />
                </Form.Group>
                {/* Care Guide */}
                <div className="d-flex justify-content-evenly align-items-center poppins-regular flex-row">
                  {/* Light */}
                  <Form.Group controlId="validationFormik02">
                    <Form.Control
                      type="text"
                      placeholder="Light..."
                      name="light"
                      value={values.light}
                      onChange={handleChange}
                      isValid={touched.light && !errors.light}
                      isInvalid={touched.light && !!errors.light}
                    />
                  </Form.Group>
                  {/* Water */}
                  <Form.Group controlId="validationFormik03">
                    {/*    <Form.Label>Water Needs</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Water..."
                      name="water"
                      value={values.water}
                      onChange={handleChange}
                      isValid={touched.water && !errors.water}
                      isInvalid={touched.water && !!errors.water}
                    />
                  </Form.Group>
                  {/* Soil */}
                  <Form.Group controlId="validationFormik04">
                    {/*        <Form.Label>Soil Type</Form.Label> */}
                    <Form.Control
                      type="text"
                      placeholder="Soil..."
                      name="soil"
                      value={values.soil}
                      onChange={handleChange}
                      isValid={touched.soil && !errors.soil}
                      isInvalid={touched.soil && !!errors.soil}
                    />
                  </Form.Group>
                </div>
                {/* Condition Options */}
                <Form.Group controlId="validationFormik05">
                  {/*                <Form.Label>Plant Condition</Form.Label> */}
                  <Form.Select
                    name="condition"
                    value={values.condition}
                    onChange={handleChange}
                    isValid={touched.condition && !errors.condition}
                    isInvalid={touched.condition && !!errors.condition}
                  >
                    <option value="">Select Plant Condition...</option>
                    <optgroup>
                      <option value="thriving">Thriving</option>
                      <option value="healthy">Healthy</option>
                      <option value="needslove">Needs Love</option>
                    </optgroup>
                  </Form.Select>
                  {touched.condition && errors.condition && (
                    <Form.Control.Feedback type="invalid">
                      {errors.condition}
                    </Form.Control.Feedback>
                  )}
                  {touched.condition && !errors.condition && (
                    <Form.Control.Feedback></Form.Control.Feedback>
                  )}
                </Form.Group>
                {/* Deal */}

                <Form.Group controlId="validationFormik06">
                  {/*                   <Form.Label>Deal</Form.Label> */}
                  <Form.Select
                    name="deal"
                    value={values.deal}
                    onChange={handleChange}
                    isValid={touched.deal && !errors.deal}
                    isInvalid={touched.deal && !!errors.deal}
                  >
                    <option value="">Select Deal...</option>
                    <optgroup>
                      <option value="swap">Swap</option>
                      <option value="sale">Sale</option>
                      <option value="giveaway">Giveaway</option>
                    </optgroup>
                  </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-evenly align-items-center poppins-regular flex-row">
                  {/* swap for */}
                  <Form.Group controlId="validationFormik07" className="w-20">
                    <Form.Control
                      type="text"
                      placeholder="Swap for..."
                      name="swapfor"
                      value={values.swapfor}
                      onChange={handleChange}
                      isValid={touched.swapfor && !errors.swapfor}
                      isInvalid={touched.swapfor && !!errors.swapfor}
                    />
                  </Form.Group>
                  {/* Price */}
                  <Form.Group controlId="validationFormik08" className="w-20">
                    <Form.Control
                      type="number" // Change to 'number'
                      placeholder="Price.."
                      name="price"
                      value={values.price} // Ensure the value is treated as a number
                      onChange={(e) =>
                        setFieldValue("price", Number(e.target.value))
                      } // Convert input to number
                      isValid={touched.price && !errors.price}
                      isInvalid={touched.price && !!errors.price}
                      min="1"
                    />
                    {touched.price && errors.price && (
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    )}
                    {touched.price && !errors.price && (
                      <Form.Control.Feedback></Form.Control.Feedback>
                    )}
                  </Form.Group>
                </div>
                {/* Description */}
                <Form.Group controlId="validationFormik09">
                  {/*            <Form.Label>Description</Form.Label> */}
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && !!errors.description}
                  />

                  {touched.description && errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  )}
                  {touched.description && !errors.description && (
                    <Form.Control.Feedback></Form.Control.Feedback>
                  )}
                </Form.Group>
                {/* Location and delivery */}
                <div className="d-flex justify-content-evenly align-items-center poppins-regular flex-row">
                  {/* Location */}
                  <Form.Group controlId="validationFormik10" className="w-20">
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      isValid={touched.location && !errors.location}
                      isInvalid={touched.location && !!errors.location}
                    />

                    {touched.location && errors.location && (
                      <Form.Control.Feedback type="invalid">
                        {errors.location}
                      </Form.Control.Feedback>
                    )}
                    {touched.location && !errors.location && (
                      <Form.Control.Feedback></Form.Control.Feedback>
                    )}
                  </Form.Group>
                  {/* Delivery Options */}
                  <Form.Group controlId="validationFormik11" className="w-20">
                    <Form.Select
                      name="delivery"
                      value={values.delivery}
                      onChange={handleChange}
                      isValid={touched.delivery && !errors.delivery}
                      isInvalid={touched.delivery && !!errors.delivery}
                    >
                      <option value="">Select Delivery...</option>
                      <optgroup>
                        <option value="shipping">Shipping</option>
                        <option value="pickup">Pick-up</option>
                        <option value="flexible">Flexible</option>
                      </optgroup>
                    </Form.Select>
                    {touched.delivery && errors.delivery && (
                      <Form.Control.Feedback type="invalid">
                        {errors.delivery}
                      </Form.Control.Feedback>
                    )}
                    {touched.delivery && !errors.delivery && (
                      <Form.Control.Feedback></Form.Control.Feedback>
                    )}
                  </Form.Group>
                </div>
                {/* Upload Photo */}
                <Form.Group controlId="validationFormik12">
                  {/*            <Form.Label>Upload Images:</Form.Label> */}
                  <Form.Control
                    type="file"
                    name="images" // Adjust field name for multiple files
                    onChange={(event) => {
                      const file = (event.target as HTMLInputElement)
                        .files?.[0];
                      // Convert FileList to Array
                      setFieldValue("images", file); // Update field value with array of files
                    }}
                    accept="image/png, image/jpeg, image/webp, image/jpg" // Limit to specific file types
                    multiple // Allow multiple file selection
                    isValid={touched.images && !errors.images}
                    isInvalid={!!errors.images && touched.images}
                  />
                  {touched.images && errors.images && (
                    <Form.Control.Feedback type="invalid">
                      {errors.images}
                    </Form.Control.Feedback>
                  )}
                  {touched.images && !errors.images && (
                    <Form.Control.Feedback></Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3 d-flex ">
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to Terms & Conditions"
                    onChange={handleChange}
                    isInvalid={touched.terms && !!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik0"
                  />
                </Form.Group>
                <Button type="submit" className="submit-button">
                  Submit form
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Col>
      <NewPostModal show={show} handleClose={handleClose} />
    </div>
  );
}

export default NewPost;
