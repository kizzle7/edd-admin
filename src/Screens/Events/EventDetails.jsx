export const EventDetailsInfo = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div>
            <img
              src={data?.image?.url}
              className="w-100"
              style={{ borderRadius: "8px" }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Event Name
                </label>
              </div>
              <div class="col-8 text-right">{data?.title}</div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Event Category
                </label>
              </div>
              <div class="col-8 text-right">{data?.category}</div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Accomodation Price 
                </label>
              </div>
              <div class="col-8 text-right">${data?.accommodation_price}</div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Event Content
                </label>
              </div>
              <div class="col-8 text-right">{data?.content}</div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Event Subtitle
                </label>
              </div>
              <div class="col-8 text-right">{data?.subtitle}</div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Youtube Link 
                </label>
              </div>
              <div class="col-8 text-right"><a href={data?.youtube_link}>{data.youtube_link}</a></div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Zoom Link
                </label>
              </div>
              <div class="col-8 text-right"><a href={data?.zoom_link}>{data?.zoom_link}</a></div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <label for="inputPassword6" class="col-form-label">
                  Locattion
                </label>
              </div>
              <div class="col-8 text-right">{data?.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
