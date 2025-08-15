import { useDrag } from 'react-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ItemTypes = {
  CARD: 'card',
};

export default function DraggableCard({ card }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { card },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="relative">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold">{card.name}</h4>
              {card.supertype === 'Energy' && (
                <Badge>{card.subtypes?.[0] || 'Basic'}</Badge>
              )}
            </div>
            {card.images?.small && (
              <img
                src={card.images.small}
                alt={card.name}
                className="w-full h-40 object-contain rounded-sm"
              />
            )}
            <div className="flex flex-wrap gap-1">
              {card.types?.map((type) => (
                <Badge key={type} variant="outline">{type}</Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {card.set.name} ({card.number}/{card.set.printedTotal})
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
