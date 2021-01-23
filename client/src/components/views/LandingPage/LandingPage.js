import React, { useEffect, useState } from 'react'
import { Icon, Card, Col, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { continents, price } from './Sections/Datas'

function LandingPage() {
    const [Travels, setTravels] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getTravels(body)

    }, [])

    const getTravels = (body) => {
        //useEffect와 loadMoreHandler에서 데이터를 가져올 때 
        //필요한 api를 요청할 때 중복 되므로 따로 만듬
        axios.post('/api/travel/travels', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {//더보기 버튼을 눌렀을 때는 이전 정보도 저장되어야 하므로.
                        setTravels([...Travels, ...response.data.travelInfo])
                    } else {
                        setTravels(response.data.travelInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 여행지를 불러오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHandler = () => {//더보기 버튼을 눌렀을 때

        let skip = Skip + Limit
        //0 + 8 -> 첫번째는 8개까지
        //8 + 8 -> 두번쩨는 16개까지 ...
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,//더보기 버튼이라는 정보
            //filters: Filters
        }

        getTravels(body)
        setSkip(skip)
    }

    const renderCards = Travels.map((travel, index) => {
        return (
            <Col lg={6} md={8} sm={12} xs={24} key={index} style={{ marginBottom: '1rem' }}>
                <Card
                    cover={<a href={`/travel/${travel._id}`} ><ImageSlider images={travel.images} /></a>}
                >
                    <Meta
                        title={travel.title}
                        description={`$${travel.price}`}
                    />
                </Card>
            </Col>
        )
    })

    const showFilterdResults = (filters) => {
        let body = {
            skip: 0,//처음부터 다시 가져와야함
            limit: Limit,
            filters: filters
        }
        getTravels(body)
        setSkip(0)
    }

    const handleFilters = (filters, category) => {
        const newfilters = { ...Filters }
        newfilters[category] = filters
        showFilterdResults(newfilters)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Go Travel <Icon type="rocket" /> </h2>
            </div>
            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>

            </Row>


            {/* Search */}

            {/* Cards */}
            <Row gutter={16, 16}>
                {renderCards}
            </Row>

            {/* 더보기 버튼 */}
            {PostSize >= Limit && //최대 개수를 출력했을 땐 더보기 버튼 안보임.
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }

        </div>
    )
}

export default LandingPage
