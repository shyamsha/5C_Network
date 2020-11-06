import { push } from "connected-react-router";
import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import "../../App.css";
import { ApplicationState } from "../../store";
import { reposRequest } from "./actions";
import { UserInfo } from "./types";

interface PropsFromState {
  loading: boolean;
  repos: UserInfo;
  errors: {
    repos?: string;
    repo?: string;
  };
}

interface PropsDispatchFromState {
  onUserRepos: typeof reposRequest;
  onRedirect: typeof push;
}

type AllProps = PropsFromState & PropsDispatchFromState;

function Repo(props: AllProps) {
  const { loading } = props;

  useEffect(() => {
    props.onUserRepos({name:"shyamsha"})
    
  })

  // if (loading) {
  //   return <div>loading...</div>;
  // }

  return (
    <div className="wrap">
      <div>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search users repos"
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      {loading?<div>loading...</div>:null}
      <div className="row">
        <div className="column">1</div>
        <div className="column">2</div>
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
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Repo);
