import { NgModule } from '@angular/core';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import { ElasticTextareaComponent } from './elastic-textarea/elastic-textarea';
import { ProfileHeaderComponent } from './profile-header/profile-header';
@NgModule({
	declarations: [ChatBubbleComponent,
    ElasticTextareaComponent,
    ProfileHeaderComponent],
	imports: [],
	exports: [ChatBubbleComponent,
    ElasticTextareaComponent,
    ProfileHeaderComponent]
})
export class ComponentsModule {}
