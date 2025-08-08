import { useState } from "react";
import "./PostSection.scss";
import { ErrorPortal } from "../ErrorPortal/ErrorPortal";
import { SuccsesRegistration } from "../SuccsesRegistration/SuccsesRegistration";

type Params = {
  setUpdateUsersList: React.Dispatch<React.SetStateAction<number>>;
};

export const PostSection: React.FC<Params> = ({ setUpdateUsersList }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>();
  const [positionId, setPositionId] = useState<number>();
  const [isSucces, setIsSucces] = useState(false);

  const validatePhoto = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        return reject("Only JPG/JPEG format is allowed.");
      }

      if (file.size > 5 * 1024 * 1024) {
        return reject("Photo must be less than 5MB.");
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 70 || img.height < 70) {
          reject("Minimum photo size is 70x70 pixels.");
        } else {
          resolve();
        }
      };
      img.onerror = () => reject("Invalid image file.");
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMessage("");

    if (!file) return;

    try {
      await validatePhoto(file);
      setPhoto(file);
    } catch (err) {
      setPhoto(null);
      setErrorMessage(err as string);
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !phone || !positionId || !photo) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Fetch token
      const tokenResult = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );
      const tokenResponse = await tokenResult.json();
      const token = tokenResponse.token;

      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("position_id", positionId.toString());
      formData.append("photo", photo);

      const response = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users",
        {
          method: "POST",
          headers: {
            Token: token,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (!result.success) {
        setErrorMessage(result.message || "Registration failed.");
      } else {
        setName("");
        setEmail("");
        setPhone("");
        setPositionId(0);
        setPhoto(null);
        setUpdateUsersList((prev) => prev + 1);
        setIsSucces(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };
  return (
    <section className="post" id="post">
      {!!errorMessage.length && (
        <ErrorPortal
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}

      {!isSucces && <h1 className="post_header">Working with POST request</h1>}

      {isSucces ? (
        <SuccsesRegistration />
      ) : (
        <form onSubmit={onFormSubmit} className="post_form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="post_form-input"
          />

          <input
            type="email"
            className="post_form-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <input
              type="tel"
              className="post_form-input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              id="Phone"
            />
            <label htmlFor="Phone" className="post_form-input-label">
              +38 (XXX) XXX - XX - XX
            </label>
          </div>

          <div className="radio">
            <legend>Select your position</legend>
            {["Frontend developer", "Backend developer", "Designer", "QA"].map(
              (pos, i) => (
                <label
                  key={i}
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  <input
                    type="radio"
                    name="position"
                    value={pos}
                    checked={positionId === i}
                    onChange={() => setPositionId(i)}
                    required
                    className="post_form-radio"
                  />{" "}
                  {pos}
                </label>
              )
            )}
          </div>

          <input
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={handlePhotoChange}
            className="post_form-file"
            required
          />

          <button
            className="post_form-button"
            type="submit"
            disabled={
              !(name && email && phone && photo && positionId !== undefined)
            }
          >
            Sign Up
          </button>
        </form>
      )}
    </section>
  );
};
