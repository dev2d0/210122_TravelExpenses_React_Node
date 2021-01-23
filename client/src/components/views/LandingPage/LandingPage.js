import React, { createFactory, useEffect, useState } from 'react'
import { Icon, Card, Col, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import SearchBox from './Sections/SearchBox'
import { continents, price } from './Sections/Datas'

function LandingPage() {
    const [Travels, setTravels] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchTerm, setSearchTerm] = useState("")
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
        //데이터를 불러올 때마다 반복해서 요청되는 함수, body에 필요한 정보를 함께 보내줌.
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
            filters: Filters
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
                        description={`${travel.price}원`}
                    />
                </Card>
            </Col>
        )
    })

    const showFilterdResults = (filters) => {//
        let body = {
            skip: 0,//처음부터 다시 가져와야함
            limit: Limit,
            filters: filters
        }
        getTravels(body)
        setSkip(0)
    }

    const handlePrice = (value) => {//Data에서 가격 정보를 받아오기 위함.
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        //filters에는 _id가 들어가고 category에는 continents나 price가 들어간다.
        const newFilters = { ...Filters }//Filters State의 정보를 담는다.
        newFilters[category] = filters//새로 들어온 filters 정보를 추가한다.

        if (category === 'price') {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues//price의 [0,200,000]이런 형식의 데이터가 들어옴.
        }
        showFilterdResults(newFilters)//기존 Filters 정보와 새로운 Filters정보를 합친 newFilters정보로 api요청.
        setFilters(newFilters)//continents정보와 price정보를 둘 다 가지고 있어야 하므로.
    }

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm)
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
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>

            </Row>


            {/* Search */}
            <div style = {{ display: 'flex', justifyContent: 'flex-end', margin: '1rem'}}>
                <SearchBox refreshFunction={updateSearchTerm}/>
            </div>
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
