import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonDemo = () => {
    return (
        <div>
            <Skeleton height={170} />
            <Skeleton height={20} className="mt-3" />
            <Skeleton height={20} width="70%" />
            <Skeleton height={30} width="40%" className="mt-3" />
        </div>
    )
}

export default SkeletonDemo