import { PageContainer } from '@ant-design/pro-components'
import { Link } from '@umijs/max'
import { Card } from 'antd'
import React from 'react'

export default function SelfInfo() {

  const CardOne = ({title} : {title: string}) => {
    return (<Card title={title}  style={{ width: 300 }}>
    <Link to='/'>
    <h4>周日18:30-20:30python班</h4>
    </Link>
    <p>Card content</p>
    <p>Card content</p>
  </Card>)
  }
  return (
    <PageContainer>
    <CardOne title='班级信息'/>
    </PageContainer>
  )
}
