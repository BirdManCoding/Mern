import { useReducer } from "react";
import axios from "../util/axios-instance";

import { TextField, Button } from "@material-ui/core";

const ACTIONS = {
  UPDATE_TITLE: "updateTitle",
  UPDATE_CONTENT: "updateContent",
  UPDATE_IMAGE: "updateImage",
  SEND_POST: "sendPost",
  CLEAR_CONTENT: "clearContent",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_TITLE:
      return { ...state, title: action.payload.title };
    case ACTIONS.UPDATE_CONTENT:
      return { ...state, content: action.payload.content };
    case ACTIONS.UPDATE_IMAGE:
      return { ...state, headerImage: action.payload.headerImage };
    case ACTIONS.CLEAR_CONTENT:
      return { title: "", content: "", headerImage: null };
    default:
      return state;
  }
}

function SendPost() {
  const [formState, dispatch] = useReducer(reducer, {
    title: "",
    content: "",
    headerImage: null,
  });

  async function onSubmitHandler(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formState.title);
    data.append("content", formState.content);
    data.append("headerImage", formState.headerImage);

    try {
      const response = await axios.post("/api/posts/", data);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }

    dispatch({ type: ACTIONS.CLEAR_CONTENT });
  }

  return (
    <div className='send-post'>
      <form noValidate autoComplete='off' onSubmit={e => onSubmitHandler(e)}>
        <div>
          <TextField
            id='title'
            label='Title'
            value={formState.title}
            onChange={e =>
              dispatch({
                type: ACTIONS.UPDATE_TITLE,
                payload: { title: e.target.value },
              })
            }
          />
        </div>
        <div>
          <TextField
            id='content'
            label='content'
            multiline
            rows={4}
            value={formState.content}
            onChange={e =>
              dispatch({
                type: ACTIONS.UPDATE_CONTENT,
                payload: { content: e.target.value },
              })
            }
          />
        </div>
        <div>
          <input
            type='file'
            id='headerImage'
            onChange={e =>
              dispatch({
                type: ACTIONS.UPDATE_IMAGE,
                payload: { headerImage: e.target.files[0] },
              })
            }
          ></input>
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Send Post
        </Button>
      </form>
    </div>
  );
}

export default SendPost;
