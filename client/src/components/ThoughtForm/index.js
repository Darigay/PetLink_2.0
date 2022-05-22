import React, { useState, useContext } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../../utils/queries';
// import {Image} from 'cloudinary-react';
// import { Axios } from 'axios';
const imageContext = React.createContext

const ThoughtForm = () => {
  const [thoughtText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {

      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!")
      }

      // update thought array's cache
      const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
      cache.writeQuery({
        query: QUERY_THOUGHTS,
        data: { thoughts: [addThought, ...thoughts] },
      });
    }
  })

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 480) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!url) {
      return;
    }

    try {
      await addThought({
        variables: { thoughtText: thoughtText, image: url },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
      setUrl("");
    } catch (e) {
      console.error(e);
    }
  };

  // Cloudinary
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData()
    // console.log(imageSelected);
    data.append("file", file)
    data.append("upload_preset", "jhvoxhay")
    data.append("cloud_name", "dqlwnmemx");
    console.log(data.getAll("file"));
    console.log(data.get("upload_preset"));

    fetch(
      "https://api.cloudinary.com/v1_1/dqlwnmemx/image/upload",
      {
        method: 'POST',
        body: data,
      }).then((response) => {
        return response.json(

        )
      }).then((data) => {
        setUrl(data.url)
        console.log(data);
      })
      .catch(err => console.log(err))
  };


  return (
    <div>
      <p
        className={`m-0  ${characterCount === 480 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/480
        {/* try to make character count font smaller */}
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Post some pet-related content here"
          value={thoughtText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        {/* <img src={url}
        /> */}
        <button className="btn col-12 col-md-3" type="submit" onClick={uploadImage}>
          Create
        </button>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])
          }
        />
      </form>
    </div>
  );
};

export default ThoughtForm;


// const [imageSelected, setImageSelected] = useState("");

// const uploadImage = () => {
//   const formData = new FormData()
//   formData.append("file", imageSelected)
//   formData.append("upload_preset", "yaen0elo")

//   Axios.post(
//     "https://api.cloudinary.com/v1_1/dqlwnmemx/image/upload",
//     formData
//   ).then((response) => {
//     console.log(response);
//   });
// };

// var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqlwnmemx/image/upload';
// var CLOUDINARY_UPLOAD_PRESET = 'yaen0elo';

// const [imageSelected, setImageSelected] = useState("");

// const uploadImage = () => {
//   const formData = new FormData()
//   formData.append("file", imageSelected)
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
//   console.log("files");

//   // sending data to cloudinary
//   Axios({
//     url: CLOUDINARY_URL,
//     method: 'POST',
//     data: formData
//   }).then((response) => {
//     console.log(response);
//   });

// };