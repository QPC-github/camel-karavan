import React from 'react';
import {
    Toolbar,
    ToolbarContent,
    Gallery,
    ToolbarItem,
    TextInput,
    PageSection,
    TextContent,
    Text,
    Button, Modal, FormGroup, ModalVariant, Switch, Form
} from '@patternfly/react-core';
import '../designer/karavan.css';
import {IntegrationCard} from "./IntegrationCard";
import {MainToolbar} from "../MainToolbar";
import RefreshIcon from '@patternfly/react-icons/dist/esm/icons/sync-alt-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import {Integration} from "../designer/model/CamelModel";
import {CamelApi} from "../designer/api/CamelApi";
import {CamelUi} from "../designer/api/CamelUi";

interface Props {
    integrations: []
    onSelect: any
    onCreate: any
    onDelete: any
    onRefresh: any
}

interface State {
    repository: string,
    path: string,
    integrations: [],
    isModalOpen: boolean,
    newName: string
    crd: boolean
}

export class IntegrationPage extends React.Component<Props, State> {

    public state: State = {
        repository: '',
        path: '',
        integrations: this.props.integrations,
        isModalOpen: false,
        newName: '',
        crd: true
    };

    tools = () => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <TextInput className="text-field" type="search" id="search" name="search"
                           autoComplete="off" placeholder="Search by name"/>
            </ToolbarItem>
            <ToolbarItem>
                <Button variant="secondary" icon={<RefreshIcon />} onClick={e => this.props.onRefresh.call(this)}>Refresh</Button>
            </ToolbarItem>
            <ToolbarItem>
                <Button icon={<PlusIcon />} onClick={e => this.setState({isModalOpen:true})}>Create</Button>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    title = () => (<TextContent>
        <Text component="h1">Integrations</Text>
    </TextContent>);

    closeModal = () => {
        this.setState({isModalOpen:false, newName:""});
    }
    saveAndCloseModal = () => {
        const name = CamelUi.nameFromTitle(this.state.newName) + ".yaml";
        const i = Integration.createNew(name);
        i.crd = this.state.crd;
        this.props.onCreate.call(this, i);
        this.setState({isModalOpen:false, newName:""});
    }

    render() {
        return (
            <PageSection padding={{default: 'noPadding'}}>
                <MainToolbar title={this.title()} tools={this.tools()}/>
                <PageSection isFilled className="integration-page">
                    <Gallery hasGutter>
                        {this.state.integrations.map(value => (
                            <IntegrationCard key={value} name={value} onDelete={this.props.onDelete}
                                             onClick={this.props.onSelect}/>
                        ))}
                    </Gallery>
                </PageSection>
                <Modal
                    title="Create new Integration"
                    variant={ModalVariant.small}
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={this.saveAndCloseModal}>Save</Button>,
                        <Button key="cancel" variant="secondary" onClick={this.closeModal}>Cancel</Button>
                    ]}
                >
                    <Form isHorizontal={true}>
                        <FormGroup label="Title" fieldId="title" isRequired>
                            <TextInput className="text-field" type="text" id="title" name="title"
                                       value={this.state.newName}
                                       onChange={e => this.setState({newName: e})}/>
                        </FormGroup>
                        <FormGroup label="CRD" fieldId="crd" isRequired>
                            <Switch
                                id="crd" name="crd"
                                value={this.state.crd.toString()}
                                aria-label="crd"
                                isChecked={this.state.crd}
                                onChange={e => this.setState({crd: e})}/>
                        </FormGroup>
                    </Form>
                </Modal>
            </PageSection>
        );
    }
};