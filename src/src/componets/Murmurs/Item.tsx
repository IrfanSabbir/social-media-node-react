import { FC, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import swal from "sweetalert";
import { likmurmurs } from "../../api/timeline";
import { 
  murmursListProps 
} from "../../model";

type propsType = {
  murmur: murmursListProps,
  userId: string,
  updateRefresh(): void,
  token: string,
  type?: string,
}

const MurmurItem: FC<propsType> = ({
  murmur,
  userId,
  updateRefresh,
  token,
  type
}) => {
  const [error, setError] = useState<string>("");
  const [noError, setNoError] = useState<string>("");

  const navigate = useNavigate();
  
  const likeMumur = async () => {
    const result = await likmurmurs(murmur.id, token);
    if (result.error) {
      setError("Something went wrong")
    } else {
      setNoError(result.data)
      updateRefresh();
    }
  };

  useEffect(() => {
    console.log()
    if (error || noError) {
      swal({
        text: error || noError,
        icon: noError  ? "success" : "error",
      });
    }
    setError("");
    setNoError("");

  }, [error, noError]);

  return (
    <div className="container">
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <p className="card-title">Posted By {murmur.name}</p>
          <h5 className="card-text">{murmur.text}</h5>
          {userId !== murmur.creator &&
            <p className="btn btn-success" onClick={likeMumur}>{murmur.like_count} Like</p>
          }&nbsp;
          {type !== "details" && <p className="btn btn-info" onClick={() => navigate(`/details/${murmur.id}`)}>Details</p>}
        </div>
      </div>
    </div>
  );
};

export default MurmurItem;
