import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { SettingsHeader } from "@/components/settings-header"
import { GoogleCalendarCard } from "@/components/google-calendar-card"
import { AttendanceRulesCard } from "@/components/attendance-rules-card"
import { NotificationsCard } from "@/components/notifications-card"
import { SettingsActions } from "@/components/settings-actions"

export default function ConfiguracoesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MainContent>
        <SettingsHeader />

        <div className="space-y-6">
          <GoogleCalendarCard />
          <AttendanceRulesCard />
          <NotificationsCard />
          <SettingsActions />
        </div>
      </MainContent>
    </div>
  )
}
