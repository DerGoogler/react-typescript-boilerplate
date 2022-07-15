import { Card, ViewX } from "react-onsenuix";

class Kard extends ViewX<{ name: string }, {}, HTMLDivElement> {
  public constructor(any: any) {
    super(any);

    this.createView = this.createView.bind(this);
  }

  public createView() {
    return (
      <div>
        <Card>
          <Card.Title>Hello, world!</Card.Title>
          <Card.Content>{this.props.name}</Card.Content>
        </Card>
      </div>
    );
  }
}

export { Kard };
