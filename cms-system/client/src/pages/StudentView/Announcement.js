import React, { useEffect, useState, useCallback } from "react";
import Wrapper from "../../assets/StudentWrappers/AnnouncementWrapper";
import { Navbar } from "../../components/components";
import { BsSearch } from "react-icons/bs";
import debounce from "lodash/debounce";
import { AiFillCaretDown } from "react-icons/ai";
import {
  AnnouncementItem,
  Loading,
  FormRowSelect,
} from "../../components/components";
import { useGlobalContext } from "../../context/AppContext";
const Announcement = () => {
  const {
    announcements,
    getAllAnnouncements,
    isLoading,
    handleAnnouncementChange,
    announcements_search,
    announcements_sort,
    sort_options,
  } = useGlobalContext();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    getAllAnnouncements();
  }, [announcements_search, announcements_sort]);

  const handleSearch = (e) => {
    handleAnnouncementChange({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleLocalSearch = (e) => {
    setLocalSearch(e.target.value);
    delayedSearch(e);
  };
  const delayedSearch = useCallback(
    debounce(
      (e) =>
        handleAnnouncementChange({
          name: e.target.name,
          value: e.target.value,
        }),
      1000,
      []
    )
  );

  return (
    <Wrapper>
      <Navbar title="Announcements" />
      {isLoading ? (
        <Loading center />
      ) : (
        <div className="container">
          <div className="search-cont">
            <div className="input-cont">
              <input
                type="text"
                placeholder="Enter announcement"
                name="announcements_search"
                className="search-input"
                value={localSearch}
                onChange={handleLocalSearch}
              />
              <BsSearch className="search-icon" />
            </div>
            <FormRowSelect
              list={[...sort_options]}
              name="announcements_sort"
              value={announcements_sort}
              handleChange={handleSearch}
            />
          </div>
          <div className="items-cont">
            {announcements.length > 0 ? (
              announcements.map((item) => {
                const { _id, title, description, createdAt } = item;
                return <AnnouncementItem key={_id} {...item} />;
              })
            ) : (
              <div className="no-announcements"> No Announcements Found!</div>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Announcement;
