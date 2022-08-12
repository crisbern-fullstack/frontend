import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useAuthContext } from "../../hooks/useAuthContext";

const ComposeMailForm = () => {
  const { user } = useAuthContext();
  const [date, setDate] = useState(new Date());
  const [sender, setSender] = useState("");
  const [receivers, setReceivers] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const email_args = {
      sender: sender,
      receivers: receivers,
      subject: subject,
      text: message,
      html: message,
    };

    const response = await fetch("/send-email", {
      method: "POST",
      body: JSON.stringify(email_args),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });

    const email = await response.json();

    if (response.ok) {
      setSender("");
      setReceivers("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <div>
      <div className="card-body">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="From:"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="To:"
            value={receivers}
            onChange={(e) => setReceivers(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Subject:"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <textarea
            id="compose-textarea"
            className="form-control"
            style={{ height: 300 }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </div>
      </div>
      {/* /.card-body */}
      <div className="card-footer">
        <div className="float-right">
          <button type="button" className="btn btn-default">
            <i className="fas fa-pencil-alt" /> Draft
          </button>
          <button
            onClick={handleSend}
            type="submit"
            className="btn btn-primary"
          >
            <i className="far fa-envelope" /> Send
          </button>
        </div>
      </div>
      <div className="card-footer">
        <div className="float-right">
          <DateTimePicker
            onChange={setDate}
            value={date}
            minDate={new Date()}
          />
          <button type="submit" className="btn btn-success">
            <i className="far fa-envelope" /> Send Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeMailForm;
