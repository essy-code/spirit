export default function Meeting() {
  const link = "https://meet.google.com/mxh-oxhg-qqj";

  return (
    <div className="text-center space-y-6">
      <h1 className="text-2xl text-purple-400 font-bold">
        Join Live Meeting
      </h1>

      <a href={link} className="btn text-white">
        Join Now
      </a>
    </div>
  );
}