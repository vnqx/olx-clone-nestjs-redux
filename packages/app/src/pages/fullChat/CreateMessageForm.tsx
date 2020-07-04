import React from "react";
import {
  Formik,
  Form,
  FormikBag,
  FormikFormProps,
  FormikHandlers,
  FormikProps,
  FormikHelpers,
} from "formik";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import MyTextField from "../../components/MyTextField";
import { sendMessage } from "../../reducers/fullChatReducer";

interface Props {
  chatId: string;
}

interface CreateMessageFormFields {
  content: string;
}

export default function CreateMessageForm({
  chatId,
}: Props): React.ReactElement {
  const dispatch = useDispatch();

  function handleSubmit(
    input: CreateMessageFormFields,
    { resetForm }: FormikHelpers<CreateMessageFormFields>,
  ) {
    dispatch(sendMessage({ ...input, chatId }));
    resetForm();
  }

  const initialValues: CreateMessageFormFields = {
    content: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({})}
    >
      {() => (
        <Form>
          <div>
            <MyTextField
              type="text"
              name="content"
              label="Message"
              autoComplete="off"
              margin="none"
            />
          </div>
          <Button variant="contained" type="submit" fullWidth>
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
}
