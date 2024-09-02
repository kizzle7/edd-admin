import EmptyImg from "../../assets/svgs/empty-state.svg";
function Empty({ type }) {
  return (
    <div className="">
      <div class="pt-3">
        <div
          class="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={EmptyImg} />
        </div>
        <br />
        <div class="empty-state text-center">No {type} list available</div>
      </div>
    </div>
  );
}

export default Empty;
