import { useReducer } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "../util/axios-instance";

const ACTIONS = {
  UPDATE_EMAIL: "updateEmail",
  UPDATE_PASSWORD: "updatePassword",
  CLEAR_CONTENT: "clearContent",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_EMAIL:
      return { ...state, email: action.payload.email };
    case ACTIONS.UPDATE_PASSWORD:
      return { ...state, password: action.payload.password };
    case ACTIONS.CLEAR_CONTENT:
      return { password: "", email: "" };
    default:
      return state;
  }
}

function Login() {
  const [formState, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
  });

  async function onSubmitHandler(e) {
    e.preventDefault();

    let response;
    try {
      response = await axios.post("/api/users/login", {
        ...formState,
      });
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
    dispatch({ type: ACTIONS.CLEAR_CONTENT });
  }

  return (
    <div className='register'>
      <form noValidate autoComplete='off' onSubmit={e => onSubmitHandler(e)}>
        <TextField
          id='email'
          label='email'
          value={formState.email}
          onChange={e =>
            dispatch({
              type: ACTIONS.UPDATE_EMAIL,
              payload: { email: e.target.value },
            })
          }
        />
        <TextField
          id='password'
          label='password'
          value={formState.password}
          onChange={e =>
            dispatch({
              type: ACTIONS.UPDATE_PASSWORD,
              payload: { password: e.target.value },
            })
          }
        />
        <Button variant='contained' color='primary' type='submit'>
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
