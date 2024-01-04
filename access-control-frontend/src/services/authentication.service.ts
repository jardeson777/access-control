type LoginInput = {
  email: string
  password: string
}

type LoginResponse = {
  status: number;
  message: string;
  success: boolean;
};

export const AuthenticationService = () => {
  const login = async (input: LoginInput) => {
    const response: LoginResponse = await fetch("api/login", {
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
    }).then((response) => response.json());

    return response;
  }

  return { login };
}