import React, { useState } from "react";

function EmailInput() {
  const [email, setEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <h1>input for email</h1>
      <input type="email" value={email} onChange={handleChange} />
    </div>
  );
}

export default EmailInput;
