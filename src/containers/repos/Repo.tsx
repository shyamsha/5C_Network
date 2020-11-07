import { push } from "connected-react-router";
import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import "../../App.css";
import { RouteEnums } from "../../navigator/RouteEnums";
import { ApplicationState } from "../../store";
import { flowersRequest } from "../repoDetails/actions";
import { reposRequest } from "./actions";
import { UserInfo } from "./types";

interface PropsFromState {
  loading: boolean;
  repos: UserInfo[];
  errors: {
    repos?: string;
    repo?: string;
  };
}

interface PropsDispatchFromState {
  onUserRepos: typeof reposRequest;
  onRedirect: typeof push;
  onFlowers:typeof flowersRequest;
}

type AllProps = PropsFromState & PropsDispatchFromState;

function Repo(props: AllProps) {
  const { loading, repos } = props;

  const [search, setSearch] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    const value = e.target.value;
    setSearch(value);
  };

  const onSearch = () => {
    if (search.length > 0) {
      props.onUserRepos({ name: search });
    }
  };

  const redirect=(id:number,repo:UserInfo)=>{
    props.onRedirect(`/${RouteEnums.REPODETAILS}/${id}`,repo)
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="wrap">
      <div>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search users repos using git username"
            onChange={onChange}
          />
          <button type="submit" className="searchButton" onClick={onSearch}>
            <i className="fa fa-search">Search</i>
          </button>
        </div>
      </div>
      <div className="row">
        {repos !== null &&
          repos.map((repo: UserInfo, i: number) => {
            if (i % 2 === 0) {
              return (
                <div className="column" key={repo.id}>
                  <div className="firstrow">
                    <div>
                      <img
                        src={repo.owner.avatar_url}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <div className="secondrow" onClick={()=>redirect(repo.id,repo)}>
                      {repo.name} <br />
                      <span className="subline">{repo.full_name}</span>
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
                        src={repo.owner.avatar_url}
                        alt="Avatar"
                        className="avatar"
                      />
                    </div>
                    <div className="secondrow" onClick={()=>redirect(repo.id,repo)}>
                      {repo.name} <br />
                      <span className="subline">{repo.full_name}</span>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

const mapStateToProps: any = ({ userRepos }: ApplicationState) => ({
  loading: userRepos.loading,
  repos: userRepos.repos,
  errors: userRepos.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onUserRepos: (params: { name: string }) => dispatch(reposRequest(params)),
  onRedirect: (route: string, state?: UserInfo) => dispatch(push(route, state)),
  onFlowers:(params: { name: string }) => dispatch(flowersRequest(params)),

});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Repo);
