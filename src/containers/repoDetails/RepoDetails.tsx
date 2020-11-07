import React, { Dispatch, useEffect, useState } from "react";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { reposRequest } from "../repos/actions";
import { UserInfo } from "../repos/types";
import { UserFlowers } from "./types";
import { flowersRequest } from "./actions";

interface PropsFromState {
  loading: boolean;
  repos: UserInfo[];
  flowers: UserFlowers[];
  router: History;
  errors: {
    flowers?: string;
  };
}

interface PropsDispatchFromState {
  onUserRepos: typeof reposRequest;
  onFlowers: typeof flowersRequest;
  onRedirect: typeof push;
}

type AllProps = PropsFromState & PropsDispatchFromState;

function RepoDetails(props: AllProps) {
  const { router, flowers } = props;

  const [repo, setRepo] = useState({
    name: "",
    description: "",
    owner: { login: "", avatar_url: "" },
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const userRepo: UserInfo = router.state;
    if (userRepo) {
      setRepo(userRepo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFlowers = () => {
    props.onFlowers({ name: repo.owner.login });
    setVisible(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <span
        style={{
          paddingBottom: "0.5rem",
          textDecoration: "underline",
          textDecorationColor: "blue",
          cursor: "pointer",
        }}
        onClick={()=>props.onRedirect(`/`)}
      >
        Back
      </span>
      <div className="container">
        <div className="firstcolumn">
          <div>
            <img
              src={repo.owner.avatar_url}
              alt="Avatar"
              className="avatar"
              style={{ paddingBottom: "2rem", height: "6rem", width: "6rem" }}
            />
          </div>
          <div style={{ fontWeight: 400, fontSize: "12px" }}>
            Verified by GitHub <br />
            <span className="size">
              {" "}
              GitHub confirm that this app meets <br />
              <span style={{ color: "blue" }} className="size">
                {" "}
                the requirements for verification
              </span>
            </span>
          </div>
          <div style={{ paddingTop: "2rem" }}>
            <div className="size" style={{ fontWeight: 600, fontSize: "14px" }}>
              Categories
            </div>
            <div className="one">
              <ul className="tags">
                <li>
                  <span className="tag">Code Review</span>
                </li>
                <li>
                  <span className="tag">IDEs</span>
                </li>
                <li>
                  <span className="tag">Free</span>
                </li>
                <li>
                  <span className="tag">Paid</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="secondcolumn">
          <div className="size" style={{ fontWeight: 600, fontSize: "14px" }}>
            Application
          </div>
          <div className="title">{repo.name}</div>
          <div style={{ padding: "1rem 0" }}>
            <button className="button2 button2">Set Up a plan</button>
          </div>
          <div style={{ padding: "1rem 0" }}>
            {repo.description !== null ? (
              <div>{repo.description}</div>
            ) : (
              <div>There is no description</div>
            )}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "2rem" }}>
        <button className="button button1" onClick={getFlowers}>
          Flowers
        </button>
      </div>
      {visible ? (
        <div style={{ paddingTop: "1rem" }} className="row">
          {flowers !== null &&
            flowers.map((repo: UserFlowers, i: number) => {
              if (i % 2 === 0) {
                return (
                  <div className="column" key={repo.id}>
                    <div className="firstrow">
                      <div>
                        <img
                          src={repo.avatar_url}
                          alt="Avatar"
                          className="avatar"
                        />
                      </div>
                      <div className="secondrow">
                        {repo.login} <br />
                        <span className="subline">{repo.url}</span>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="column" key={repo.id}>
                    <div className="firstrow">
                      <div>
                        <img
                          src={repo.avatar_url}
                          alt="Avatar"
                          className="avatar"
                        />
                      </div>
                      <div className="secondrow">
                        {repo.login} <br />
                        <span className="subline">{repo.url}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps: any = ({
  userRepos,
  userFlowers,
  router,
}: ApplicationState) => ({
  loading: userFlowers.loading,
  flowers: userFlowers.flowers,
  repos: userRepos.repos,
  router: router.location,
  errors: userFlowers.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onUserRepos: (params: { name: string }) => dispatch(reposRequest(params)),
  onFlowers: (params: { name: string }) => dispatch(flowersRequest(params)),
  onRedirect: (route: string, state?: UserInfo) => dispatch(push(route, state)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(RepoDetails);
