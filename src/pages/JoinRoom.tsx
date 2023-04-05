export default function JoinRoom() {
  return (
    <div className="joinroom">
      <form className="room">
        <input
          type="text"
          name="room_id"
          id="room_id"
          required
          className="px-4 py-2 rounded text-black"
          placeholder="Room id..."
        />
        <button
          type="submit"
          className="block mx-auto mt-4 py-2 px-4 bg-btn-blue disabled:opacity-50"
        >
          Join
        </button>
      </form>
    </div>
  );
}
