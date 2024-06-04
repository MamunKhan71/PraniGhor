import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function CreateDonationCampaign() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create Donation Campaign</CardTitle>
        <CardDescription>Help pets in need by creating a donation campaign.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pet-image">Pet Picture</Label>
              <Input id="pet-image" type="file" accept="image/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-donation">Maximum Donation</Label>
              <Input
                id="max-donation"
                type="number"
                placeholder="Enter maximum donation amount"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donation-end-date">Donation End Date</Label>
              <Input
                id="donation-end-date"
                type="date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="short-description">Short Description</Label>
              <Input
                id="short-description"
                type="text"
                placeholder="Enter a brief description"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="long-description">Long Description</Label>
            <Textarea
              id="long-description"
              placeholder="Enter a detailed description"
            />
          </div>
          <Button type="submit">Create Campaign</Button>
        </form>
      </CardContent>
    </Card>
  )
}