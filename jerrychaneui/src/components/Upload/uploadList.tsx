import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon/icon'
import { faCheckCircle, faFileAlt, faSpinner, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props
    return (
        <ul className="viking-upload-list">
            {fileList.map(item => {
                return (
                    <li className="viking-upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon={faFileAlt} theme="secondary" />
                            {item.name}
                        </span>
                        <span className="file-status">
                            {item.status === "uploading" && <Icon icon={faSpinner} theme="primary" />}
                            {item.status === "success" && <Icon icon={faCheckCircle} theme="success" />}
                            {item.status === "error" && <Icon icon={faTimesCircle} theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon={faTimes} onClick={() => { onRemove(item) }} />
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList;