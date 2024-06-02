import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Category = () => {
    return (
        <Carousel>
            <CarouselContent>
                <CarouselItem>
                    <div className="grid grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="space-y-4">
                                    <img className="rounded-xl" src="header1.jpg" alt="" />
                                    <CardTitle>Accessories</CardTitle>
                                    <CardDescription>84 products</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="space-y-4">
                                    <img className="rounded-xl" src="header1.jpg" alt="" />
                                    <CardTitle>Accessories</CardTitle>
                                    <CardDescription>84 products</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="space-y-4">
                                    <img className="rounded-xl" src="header1.jpg" alt="" />
                                    <CardTitle>Accessories</CardTitle>
                                    <CardDescription>84 products</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>

    );
};

export default Category;