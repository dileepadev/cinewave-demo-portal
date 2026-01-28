import { user001 } from "../../data/exampleUser";

export default function AccountPage() {
  const { fname, lname, email, phone, _id } = user001;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account</h1>

      <section>
        <div>
          <div>
            Name - {fname} {lname}
          </div>
          <div>Email - {email}</div>
          <div>{email}</div>
          <div>Phone - {phone}</div>
          <div>User ID - {_id}</div>
        </div>
      </section>
    </div>
  );
}
