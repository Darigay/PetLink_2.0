import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="bg-light flex-row justify-center mb-4 mt-10">
      <div className="col-12 col-md-6">
        <div className="card mt-4 mb-0 p-4">
          <h4 className="card-header bg-primary text-quatrinary">Login</h4>
          <div className="card-body bg-tertiary">
            <form onSubmit={handleFormSubmit}>
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
                className="btn d-block w-100  bg-primary text-quatrinary"
                type="submit"
              >
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
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

export default Login;
