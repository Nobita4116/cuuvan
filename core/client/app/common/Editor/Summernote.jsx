import React, {Component} from 'react';
import ModalMedia from '../../admin-dashboard/components/Appearance/BoxMenu/ModalMedia';
class Summernote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false
        };
    }

    componentDidMount() {
        this.initEditor();
    }

    changeContent(data) {
        this.props.changeContent(data);
    }

    initEditor() {
        let self = this;
        let {data, type, editor_id} = this.props;
        let {html_content} = data;
        type = type || 'small';
        let el_editor = $(`.${editor_id}`);
        if (type == 'small') {
            el_editor.summernote({
                toolbar: [
                    ['style', ['bold', 'italic']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link']],
                    ['view', ['fullscreen', 'codeview']]
                ],
                callbacks: {
                    onChange: function(contents, $editable) {
                        let plain_text = $(contents).text();
                        self.changeContent({
                            html_content: contents,
                            plain_text: plain_text
                        });
                    }
                }
            });
        } else {
            el_editor.summernote({
                height: 400,
                callbacks: {
                    onChange: function(contents, $editable) {
                        let plain_text = $(contents).text();
                        self.changeContent({
                            html_content: contents,
                            plain_text: plain_text
                        });
                    }
                }
            });
        }
        if (html_content) {
            el_editor.summernote('code', html_content)
        }
        
    }

    clickImage(image) {
        let {editor_id} = this.props;
        let el_editor = $(`.${editor_id}`);
        if (image.mimetype == 'image') {
            el_editor.summernote('editor.saveRange');
            el_editor.summernote('editor.restoreRange');
            el_editor.summernote('editor.focus');
            el_editor.summernote('insertImage', image.url, image.filename);
        } else if (image.mimetype == 'audio') {
            let markup = el_editor.summernote('code');
            let strAudio = `<div><audio src=${image.url} controls controlsList="nodownload"/></div>`
            el_editor.summernote('code', strAudio + markup);
        } else if (image.mimetype == 'video') {
            let markup = el_editor.summernote('code');
            let strVideo = `<div><video width="100%" src=${image.url} controls controlsList="nodownload"/></div>`
            el_editor.summernote('code', strVideo + markup);
        }
        
        this.hideModal();
    }

    showModal() {
        this.setState({
            isShowModal: true
        });
    }

    hideModal() {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        let {isShowModal} = this.state;
        let {editor_id} = this.props;
        return(
            <div className='form-group'>
                <div className="btn-group navbar-btn">
                    <button type="button" className="btn btn-default btn-sm" onClick={this.showModal.bind(this)}><i className="icon-media position-left"></i> Add Media</button>
                </div>
                <div className={editor_id}></div>
                <ModalMedia
                    clickImage={this.clickImage.bind(this)}
                    isShowModal={isShowModal}
                    hideModal={this.hideModal.bind(this)}
                />
            </div>
        );
    }
}

export default Summernote;