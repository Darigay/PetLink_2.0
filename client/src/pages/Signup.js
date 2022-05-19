import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="bg-secondary flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header bg-primary text-quatrinary">Sign Up</h4>
          <div className="card-body bg-tertiary">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Email Address"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="********"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn d-block w-100 bg-primary text-quatrinary"
                type="submit"
              >
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
        <img
          src="../assets/images/dog-1.png"
          srcset="../assets/images/dog-1@2x.png 2x,
        ../assets/images/dog-1@3x.png 3x"
          className="dog-1"
          alt="Dog holding a toy in its mouth"
        />
      </div>
    </main>
  );
};

export default Signup;
