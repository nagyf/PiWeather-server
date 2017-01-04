import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { List, ListItem, Subheader } from 'material-ui';
import Checkbox from 'material-ui/Checkbox';

class MultiSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected || [],
            itemEquals: this.props.itemEquals || ((a, b) => a === b)
        };
    }

    select(item, event, selected) {
        let selectedItems = this.state.selected.slice();

        if (selected && _.find(this.state.selected, (i) => this.props.itemEquals(i, item)) === undefined) {
            selectedItems = selectedItems.concat(item)
        } else if (!selected) {
            selectedItems = _.filter(selectedItems, (i) => !this.props.itemEquals(i, item));
        }

        this.setState({
            selected: selectedItems
        });

        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(selectedItems.slice());
        }
    }

    renderItem(item, idx) {
        let text = item;
        if (_.isFunction(this.props.renderItem)) {
            text = this.props.renderItem(item);
        }

        const isSelected = _.find(this.state.selected, i => this.state.itemEquals(item, i)) !== undefined;
        const primaryText = _.isString(text) ? text : text.primary;
        const secondaryText = _.isObject(text) ? null : text.secondary;

        return (
            <ListItem key={idx} primaryText={primaryText} secondaryText={secondaryText}
                      leftCheckbox={
                          <Checkbox defaultChecked={isSelected} onCheck={this.select.bind(this, item)}/>
                      }/>
        )
    }

    render() {
        const items = _.map(this.props.items, this.renderItem.bind(this));

        return (
            <List>
                <Subheader>{this.props.title || ''}</Subheader>
                {items}
            </List>
        );
    }
}

MultiSelect.propTypes = {
    items: PropTypes.array.isRequired,
    selected: PropTypes.array,
    itemEquals: PropTypes.func,
    renderItem: PropTypes.func,
    onChange: PropTypes.func,
    title: PropTypes.string
};

export default MultiSelect;
