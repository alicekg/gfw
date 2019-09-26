import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';
import { deburrUpper } from 'utils/data';
import Link from 'redux-first-router-link';

import Icon from 'components/ui/icon';
import Button from 'components/ui/button';
import AoICard from 'components/aoi-card';
import Pill from 'components/ui/pill';
import Dropdown from 'components/ui/dropdown';
import Search from 'components/ui/search';

import mapIcon from 'assets/icons/view-map.svg';
import editIcon from 'assets/icons/edit.svg';
import shareIcon from 'assets/icons/share.svg';

import './styles.scss';

class AreasTable extends PureComponent {
  static propTypes = {
    areas: PropTypes.array,
    tags: PropTypes.array,
    viewArea: PropTypes.func,
    setSaveAOISettings: PropTypes.func,
    setShareModal: PropTypes.func
  };

  state = {
    activeTags: [],
    sortBy: '',
    search: ''
  };

  render() {
    const {
      areas,
      tags,
      viewArea,
      setSaveAOISettings,
      setShareModal
    } = this.props;
    const { activeTags, search } = this.state;

    const selectedTags = tags.filter(t => activeTags.includes(t.value));
    const unselectedTags = tags.filter(t => !activeTags.includes(t.value));
    const filteredAreas =
      selectedTags && selectedTags.length && areas && areas.length
        ? areas.filter(a => !!intersection(a.tags, activeTags).length)
        : areas;
    const filterAreasBySearch =
      filteredAreas && filteredAreas.length && search
        ? filteredAreas.filter(a =>
          deburrUpper(a.name).includes(deburrUpper(search))
        )
        : filteredAreas;
    const sortedAreas = sortBy(
      filterAreasBySearch,
      this.state.sortBy || 'name'
    );
    const orderedAreas =
      this.state.sortBy === 'createdAt' ? sortedAreas.reverse() : sortedAreas;

    const hasSelectedTags = selectedTags && !!selectedTags.length;
    const hasUnselectedTags = unselectedTags && !!unselectedTags.length;

    return (
      <div className="c-areas-table">
        <div className="row filter-row">
          <div className="column small-12 medium-5 filter-group">
            {(hasSelectedTags || hasUnselectedTags) && (
              <span className="filter-title">Filter by tag</span>
            )}
            <div className="filter-tags">
              {hasSelectedTags &&
                selectedTags.map(tag => (
                  <Pill
                    className="filter-tag"
                    key={tag.value}
                    active
                    label={tag.label}
                    onRemove={() =>
                      this.setState({
                        activeTags: activeTags.filter(t => t !== tag.value)
                      })
                    }
                  />
                ))}
              {hasUnselectedTags && (
                <Dropdown
                  className="filter-tag"
                  theme="theme-dropdown-button theme-dropdown-button-small"
                  placeholder={
                    activeTags && activeTags.length > 0
                      ? 'Add more tags'
                      : 'Filter by tags'
                  }
                  noItemsFound="No tags found"
                  noSelectedValue={
                    activeTags && activeTags.length > 0
                      ? 'Add more tags'
                      : 'Filter by tags'
                  }
                  options={unselectedTags}
                  onChange={tag =>
                    tag.value &&
                    this.setState({
                      activeTags: [...activeTags, tag.value]
                    })
                  }
                />
              )}
            </div>
          </div>
          <div className="column small-12 medium-4 filter-group">
            <span className="filter-title">Order by</span>
            <div className="filter-tags">
              <Pill
                className="filter-tag"
                active={this.state.sortBy === 'createdAt'}
                label="Creation date"
                onClick={() =>
                  this.setState({
                    sortBy: this.state.sortBy === 'createdAt' ? '' : 'createdAt'
                  })
                }
              />
              <Pill
                className="filter-tag"
                active={this.state.sortBy === 'GLADS'}
                label="GLAD alerts"
                onClick={() =>
                  this.setState({
                    sortBy: this.state.sortBy === 'GLADS' ? '' : 'GLADS'
                  })
                }
              />
              <Pill
                className="filter-tag"
                active={this.state.sortBy === 'VIIRS'}
                label="VIIRS alerts"
                onClick={() =>
                  this.setState({
                    sortBy: this.state.sortBy === 'VIIRS' ? '' : 'VIIRS'
                  })
                }
              />
            </div>
          </div>
          <div className="column small-12 medium-3">
            <div className="filter-search">
              <Search
                theme="theme-search-small"
                placeholder="Search"
                input={search}
                onChange={value => this.setState({ search: value })}
              />
            </div>
          </div>
        </div>
        {orderedAreas &&
          !!orderedAreas.length &&
          orderedAreas.map((area, i) => (
            <div key={area.id} className="row area-row">
              <div className="column small-12 medium-9">
                <Link to={`/dashboards/aoi/${area.id}`}>
                  <AoICard index={i} {...area} />
                </Link>
              </div>
              <div className="column small-12 medium-3">
                <div className="area-links">
                  <Button
                    className="area-link"
                    theme="theme-button-clear"
                    onClick={() =>
                      viewArea({
                        areaId: area.id,
                        locationType: 'location/MAP'
                      })
                    }
                  >
                    <Icon className="link-icon" icon={mapIcon} />
                    view on map
                  </Button>
                  <Button
                    className="area-link"
                    theme="theme-button-clear"
                    onClick={() =>
                      setSaveAOISettings({ open: true, activeAreaId: area.id })
                    }
                  >
                    <Icon className="link-icon" icon={editIcon} />
                    edit
                  </Button>
                  <Button
                    className="area-link"
                    theme="theme-button-clear"
                    onClick={() =>
                      setShareModal({
                        title: 'Share your area',
                        shareUrl: `${window.location.host}/dashboards/aoi/${
                          area.id
                        }`
                      })
                    }
                  >
                    <Icon className="link-icon" icon={shareIcon} />
                    share
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default AreasTable;